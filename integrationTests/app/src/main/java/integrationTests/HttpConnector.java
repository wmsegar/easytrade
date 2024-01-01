package integrationTests;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

public class HttpConnector {
    private final URL baseUrl;

    public HttpConnector(URL baseUrl) {
        this.baseUrl = baseUrl;
    }
    public Integer getResponseCode(String endpoint) {
        URL url = Url.extendUrl(baseUrl, endpoint);
        try {
            return getHttpConnection(url).getResponseCode();
        } catch (IOException e) {
            throw new RuntimeException("Error when trying to get response code from [" + url.toString() + "]", e);
        }
    }

    private HttpURLConnection getHttpConnection(URL url) {
        try {
            return (HttpURLConnection) url.openConnection();
        } catch (IOException e) {
            throw new RuntimeException("Error when trying to open connection to [" + url.toString() + "]", e);
        }
    }
}