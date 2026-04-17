import http from "k6/http";
import { sleep } from "k6";
import { Counter, Trend } from 'k6/metrics';

export const options = {
    vus: 5,
    duration: '5s',
    thresholds: {
        http_req_duration: ['p(95) < 250'],
        my_counter: ['count>=5'],
        response_time_new_page: ['p(90)<200']
    }
};

let myCounter = new Counter('my_counter');
let newPageResponseTrend = new Trend('response_time_new_page');

export default function () {
    const res = http.get("https://quickpizza.grafana.com/test.k6.io/");
    myCounter.add(1);
    sleep(2);

    const newPageResponse = http.get("https://quickpizza.grafana.com/news.php");
    newPageResponseTrend.add(newPageResponse.timings.duration);
    sleep(2);
}
