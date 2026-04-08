import http from "k6/http";
import {check, sleep} from "k6";
import { expect } from "https://jslib.k6.io/k6-testing/0.3.0/index.js";

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<200'],
        http_req_failed: ['rate<0.01'],
        iterations: ['count<=50'],
        data_received: ['count<=' + 309 * 1024]
    }
}

export default function () {
    const res = http.get("https://quickpizza.grafana.com/test.k6.io/");

    check(res, {
        'Status code is 200': res.status === 200,
        'The body include some text': res.body.toString().includes('Note that this is a shared testing environment ')
    });

    expect(res.status, 'response status').toBe(200);
}
