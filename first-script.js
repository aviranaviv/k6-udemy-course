import http from 'k6/http';

export const options = {
    vus: 10,
    duration: '60s'
}
export default function () {
    http.get('https://quickpizza.grafana.com/test.k6.io/')
}