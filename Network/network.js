class Network {
    static sendRequest(request, callback) {
        const delay = Math.floor(Math.random() * 2000) + 1000; // השהיה בין 1 ל-3 שניות
        const dropChance = Math.random(); // הסתברות להשמטה
        
        console.log(`Sending request to ${request.url} with ${delay}ms delay...`);

        setTimeout(() => {
            if (dropChance < 0.1) { // לדוגמה, השמטה בהסתברות של 30%
                console.log(`Request to ${request.url} was dropped!`);
                callback(null, 0);
                return;
            }

            // תגובת JSON מדומה מהשרת
            const mockResponse = JSON.stringify({ success: true, message: "Data received" });
            callback(mockResponse, 200);
        }, delay);
    }
}
