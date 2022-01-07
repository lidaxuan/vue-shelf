import service from "../api";
// import store from "../store";
import { Message } from "element-ui";
import router from '@/router';

export function storageFun(msg) {
    Message.error(msg)
    setTimeout(() => {
        // 初始化缓存
        window.sessionStorage.clear();
        router.push("/login");
    }, 1500)

}
export function serveApi(instance) {
    const HttpList = {};//包裹请求的容器
    // 请求格式/参数的统一
    for (let key in service) {
        let api = service[key];//url  method
        //async能避免进入回调地狱
        HttpList[key] = async function (
            params,//请求参数
            isFormData = false,//标识是否formData格式数据
            id,//标识是否在url直接加参数
            config = {},//配置参数
            contentType
        ) {
            let newParams = {};
            // content-type判断
            if (params && isFormData) {
                newParams = new FormData();
                for (let i in params) {
                    newParams.append(i, params[i]);
                }
            } else {
                newParams = params;
            }
            switch (contentType) {
                case "text/html":
                    config.headers = {
                        "content-type": "text/html;charset=utf-8",
                    }
                    break;
                case "x-form":
                    config.headers = {
                        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
                    }
                    break;
                case "form-data":
                    config.headers = {
                        "content-type": "multipart/form-data;charset=utf-8",
                    }
                    break;
                default:
                    config.headers = {
                        "content-type": "application/json;charset=utf-8",
                    }
                    break;
            }
            let response = {};
            //不同请求的判断get  post put 根据后台接口需求而定
            if (api.method === "post" || api.method === "put" || api.method === "patch") {
                try {
                    response = await instance[api.method](id == undefined ? api.url : api.url + "/" + id, newParams, config);
                } catch (err) {
                    response = err;
                }
            } else if (api.method === "delete" || api.method === "get") {
                config.params = newParams;
                try {
                    response = await instance[api.method](id == undefined ? api.url : api.url + "/" + id, config);

                } catch (err) {
                    response = err;
                }
            }
            // if (response.code && response.code != 0 ) {
            //     Message.error(response.msg);
            // }
            return response;
        }
    }
    //请求拦截器的
    instance.interceptors.request.use(config => {
        const token = `eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiLmmJPogYrnp5HmioAiLCJpc3MiOiLmmJPogYrnp5HmioAiLCJpYXQiOjE2MzkzNTgyNTksImV4cCI6MTYzOTQ0NDY1OSwiY29tcGFueUlkIjoxNjUzNSwidXNlcklkIjoiY2FpaGFvMTY1MzUiLCJhcHBJZCI6IjkxMjAxIiwiZGVwYXJ0bWVudElkIjoxNjYxMCwiZ2VuZXJhdGVUaW1lIjoiMjAyMS0xMi0xMyAwOToxNzozOSIsImp0aSI6ImUyZWVjMDRlLThkNTctNDU4NS1hYjE2LWQyYmNjODQ0ZTYzNSJ9.NYFEbfmnm5nn6x7ZEjhgUIn5XwLKxRSd1Yxgkb7O5wd4Ix_DY1_fIvFkLwlPsihckF6TCsxPBdzEtNMd9EjLRMaBXt9lMgPFcdccfixa0Wzsax0-ZDaf1CL6r8vcmBRvjXRnD9IjZQirrKQMMqQBFNd0sOBTI8_tLeE_8HzxC2M
        `
        config.headers['Authorization'] = token;
        return config;
    }, err => {
        return err;
    });
    //http response 拦截器
    instance.interceptors.response.use(res => {
        let data = res.data;
        switch (data.code) {
            case 200:
                break;
            case 0:
                break;
            default:
                break;
        }
        return res.data;
    }, (err) => {
        let data = err.response.data;
        if (err.response.status == 401) {
            storageFun(data.msg || "token失效，请重新登陆。")
        } else if (err.response.status == 403) {
            const mode = process.env.VUE_APP_CURRENTMODE;
            switch (mode) {
                case 'local':
                    window.location.href = 'http://test.easyliao.com/auth-eupms/vi/base#/unAuth';
                    break;
                case 'dev':
                    window.location.href = 'http://dev-app.easyliao.com/auth-eupms/vi/base#/unAuth';
                    break;
                case 'production':
                    window.location.href = 'http://auth.easyliao.com/auth-eupms/vi/base#/unAuth';
                    break;

                default:
                    break;
            }
        }
        return err;
    });
    return HttpList;
}
