package integrationTests;

import java.time.Duration;
import java.time.Instant;

public class Timer {
    public static Duration timeExecution(Callback function){
        Instant start = Instant.now();
        function.call();
        return Duration.between(start, Instant.now());
    }
}
