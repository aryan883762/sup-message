import Vue from "vue";
import Router from "vue-router";
import Master from "./layouts/Master";
import Guest from "./layouts/Guest";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Activate from "./pages/Activate";
/*Recently added Pages */
import Settings from "./pages/Settings";
import Payments from "./pages/Payments";
import EmailHistory from "./pages/EmailHistory";
import Integration from './pages/Integration';
import axios from 'axios';
import compareVersion from 'compare-versions';
import External from './layouts/External'
import Home from './pages/Home';
import TC from './pages/TC';
import Privacy from './pages/Privacy';
import CTC from './pages/CTC';
import CPrivacy from './pages/CPrivacy';
import Devices from './pages/Devices';
import MessageLayout from './layouts/MessageLayout';
import MessageHome from './pages/messages/messageHome';
import SendMessage from './pages/messages/sendMessage';
import Billing from './pages/Billing';
Vue.use(Router);

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            component: External,
            children: [
                {
                    path: "",
                    component: Home,
                    name: "Home",
                    meta: {
                        auth: false
                    }
                },
                {
                    path: "terms_condition",
                    component: localStorage.getItem('activeLang') == 'zh_HK' ? CTC : TC,
                    name: "TC",
                    meta: {
                        auth: false
                    }
                },
                {
                    path: "privacy_policy",
                    component: localStorage.getItem('activeLang') == 'zh_HK' ? CPrivacy : Privacy,
                    name: "Privacy",
                    meta: {
                        auth: false
                    }
                }

            ]
        },
        {
            path: "/dashboard",
            name: "dashboard",
            redirect: "profile",
            component: Master,
            children: [
                {
                    path: "profile",
                    name: "Profile",
                    component: Profile,
                    meta: {
                        auth: true
                    }
                },
                {
                    path: "payments",
                    name: "Payments",
                    component: Payments,
                    meta: {
                        auth: true
                    }
                },
                // {
                //     path: "emailLogs",
                //     name: "EmailHistory",
                //     component: EmailHistory,
                //     meta: {
                //         auth: true
                //     }
                // },
                {
                    path: "integration",
                    name: "Integration",
                    component: Integration,
                    meta: {
                        auth: true
                    }
                },
                {
                    path: "settings",
                    name: "Settings",
                    component: Settings,
                    meta: {
                        auth: true
                    }
                },
                {
                    path: "devices",
                    name: "Devices",
                    component: Devices,
                    meta: {
                        auth: true
                    }
                },
                {
                    path: "billing",
                    name: "Billing",
                    component: Billing,
                    meta: {
                        auth: true
                    }
                },
                {
                    path: "messages",
                    component: MessageLayout,
                    children: [
                        {
                            path: "",
                            name: "MessageHome",
                            component: MessageHome,
                            meta: {
                                auth: true
                            },
                        },
                        {
                            path: "SendMessage",
                            name: "SendMessage",
                            component: SendMessage,
                            meta: {
                                auth: true
                            },
                        }
                    ]
                }
            ]
        },
        {
            path: "/",
            component: Guest,
            children: [
                {
                    path: "login",
                    name: "Login",
                    component: Login,
                    meta: {
                        auth: false
                    }
                },
                {
                    path: "register",
                    name: "Register",
                    component: Register,
                    meta: {
                        auth: false
                    }
                },
                {
                    path: "forgot-password",
                    name: "ForgotPassword",
                    component: ForgotPassword,
                    meta: {
                        auth: false
                    }
                },
                {
                    path: "reset-password",
                    name: "ResetPassword",
                    component: ResetPassword,
                    meta: {
                        auth: false
                    }
                },
                {
                    path: "activate",
                    name: "Activate",
                    component: Activate,
                    meta: {
                        auth: false
                    }
                }
            ]
        }
    ]
});

router.beforeEach(async (to, from, next) => {

    // console.log("route init");

    if (!_.get(Vue, 'prototype.startup')) {
        let startup = await axios.get("/startup")
        Vue.prototype.startup = startup
        let currentTranslationVersion = _.toNumber(localStorage.getItem('translationVersion')) || "0"

        // console.log(currentTranslationVersion, startup.data.translationVersion)
        // console.log(compareVersion(currentTranslationVersion, startup.data.translationVersion))
        let isTranslationOld = startup.data.translationVersion > currentTranslationVersion
        // let isTranslationOld = compareVersion(currentTranslationVersion, startup.data.translationVersion) === -1
        // isTranslationOld = true // TODO minor: remove test

        if (isTranslationOld || !localStorage.getItem('translation')) {
            // update translation
            let translations = await axios.get("/translations")

            localStorage.setItem('translation', JSON.stringify(translations.data))
            localStorage.setItem('translationVersion', translations.data.version)
            localStorage.setItem('translationLanguage', JSON.stringify(startup.data.languages))
            localStorage.setItem('activeLang', startup.data.languages[0]);
        }
    }
    // console.log('route done')

    if (to.matched.some(record => record.meta.auth)) {
        if (localStorage.getItem("token") == null) {
            next({ name: "Login" });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
