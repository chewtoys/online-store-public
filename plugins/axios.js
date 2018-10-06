import axios from 'axios'
export default function({ $axios }) {
	$axios.defaults.baseURL = 'http://localhost:8100/api'
}

