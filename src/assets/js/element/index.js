import Vue from 'vue';
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';


// Vue.use(ElementUI);
import {
    Button,
    Dialog,
    Radio,
    RadioGroup,
    Input,
    Table,
    TableColumn,
    DatePicker,
    TimePicker,
    FormItem,
    Form,
    Tabs,
    TabPane,
    Loading,
    Message,
    MessageBox,
    Notification
} from 'element-ui';

Vue.use(Button)
Vue.use(Dialog)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Input)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(FormItem)
Vue.use(Form)
Vue.use(Tabs)
Vue.use(TabPane)

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;