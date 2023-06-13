export class TaskOptions {

    secureAccess: boolean;
    tag: string | null; 
    
    constructor(options?: Partial<TaskOptions>) {
        this.secureAccess = (options?.secureAccess === undefined) ? false : options.secureAccess; 
        this.tag = options?.tag ? options.tag : null;
    }
}

export class UseTaskOptions {

    secureAccessKey?: string;

    constructor(options?: UseTaskOptions) {
        this.secureAccessKey = options?.secureAccessKey;
    }
}

