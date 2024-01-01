package integrationTests;

import java.net.MalformedURLException;
import java.net.URL;

public class Url {
    public static URL getUrl(String protocol, String domain, int port, String endpoint) {
        try {
            return new URL(protocol, domain, port, validatedEndpoint(endpoint));
        } catch (MalformedURLException e) {
            throw new RuntimeException("Couldn't create URL from [" + protocol + "], [" + domain + "], ["
                    + Integer.toString(port) + "], [" + endpoint + "]", e);
        }
    }

    public static URL getUrl(String protocol, String domain, int port) {
        return getUrl(protocol, domain, port, "");
    }

    public static URL getUrl(String protocol, String domain) {
        return getUrl(protocol, domain, 80);
    }

    public static URL getUrl(String domain) {
        return getUrl("http", domain);
    }

    public static URL extendUrl(URL baseUrl, String endpoint) {
        try {
            return new URL(baseUrl, validatedEndpoint(endpoint));
        } catch (MalformedURLException e) {
            throw new RuntimeException("Couldn't add endpoint [" + baseUrl.toString() + "] to url [" + endpoint + "]",
                    e);
        }
    }

    private static String validatedEndpoint(String endpoint) {
        if (endpoint.isEmpty()) {
            return endpoint;
        }
        if (endpoint.startsWith("/")) {
            return endpoint;
        }
        throw new IllegalArgumentException(
                "Argument [endpoint] must either be empty or start with '/', was [" + endpoint + "]");
    }
}
