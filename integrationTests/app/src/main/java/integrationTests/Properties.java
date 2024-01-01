package integrationTests;

import java.util.Optional;

public class Properties {
    public static String ensureProperty(String propertyName) {
        return Optional.ofNullable(System.getProperty(propertyName))
                .orElseThrow(() -> new IllegalStateException("Property [" + propertyName + "] has not been set."));
    }
}
