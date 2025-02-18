/**
 * ready state:
 * 0 start
 * 1 opened
 * 2 sent
 * 3 loading
 * 4 done
 */
class FXMLHttpRequest {
    constructor() {
        this.url = null;
        this.method = "GET";
        this.data = null;
        this.response = null;
        this.readyState = 0;
        this.status = 0;
        this.onload = null;
        this.onerror = null;
    }

    open(method, url) {
        this.method = method;
        this.url = url;
        this.readyState = 1; // Opened
    }

    send(data = null) {
        this.data = data;
        this.readyState = 2; // Sent

        Network.sendRequest(this, (response, status) => {
            this.status = status;
            this.response = response;
            this.readyState = 4; // Done
            
            if (this.status >= 200 && this.status < 300) {
                if (this.onload) this.onload();
            } else {
                if (this.onerror) this.onerror();
            }
        });
    }
}
export default FXMLHttpRequest;