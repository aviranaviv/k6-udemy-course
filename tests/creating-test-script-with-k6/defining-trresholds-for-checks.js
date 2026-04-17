import http from "k6/http";
import {check, sleep} from "k6";
import exec from "k6/execution";

export const options = {
    vus: 10,
    duration: '5s',
    thresholds: {
        http_req_duration: ['p(95) < 200', 'max < 2000'],
        http_req_failed: ['rate < 0.01'],
        http_reqs: ['count >= 20', 'rate >= 4'],
        checks: ['rate >= 0.99'],
        vus: ['value > 9'],
    }
}

export default function () {
    const res = http.get("https://quickpizza.grafana.com/test.k6.io/");
    console.log(exec.scenario.iterationInTest)
    check(res, {
        'Status code is 200': res.status === 200,
        'The body include some text': res.body.toString().includes('Note that this is a shared testing environment ')
    });
    sleep(2);
}
