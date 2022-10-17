import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Amplify from 'aws-amplify';
import AwsExports from './aws-exports';

Amplify.configure(AwsExports)

createApp(App).mount('#app')
