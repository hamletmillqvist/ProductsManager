import {HttpMethod} from "@shared/HttpMethod";

export function ControllerRoute(path: string): ClassDecorator {
    return function (controller: any) {
        controller["apiRoute"] = path;
    }
}

export function ApiRoute(path: string, method: HttpMethod): PropertyDecorator {
    return function (controller: any, propertyKey: any) {
        const prop = controller[propertyKey];
        prop["apiRoute_path"] = path
        prop["apiRoute_method"] = method;
    }
}