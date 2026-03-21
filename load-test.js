import http from 'k6/http';
import { sleep } from 'k6'

export const options = {
    stages: [
        {
            target: 10,
            duration: '10s'
        },
         {
            target: 10,
            duration: '30s'
        },
         {
            target: 0,
            duration: '10s'
        },
    ]
}

export default function () {
    http.get('https://quickpizza.grafana.com/test.k6.io/')
    sleep(1)
    http.get('https://quickpizza.grafana.com/contacts.php')
    sleep(2)
    http.get('https://quickpizza.grafana.com/news.php')
    sleep(2)
}