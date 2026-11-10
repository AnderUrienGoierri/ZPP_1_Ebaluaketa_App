import java.util.concurrent.*;

public class ExecutorDemo {
    public static void main(String[] args) {
        ExecutorService executor =
                Executors.newFixedThreadPool(2);
        for (int i = 1; i <= 5; i++) {
            int id = i;
            executor.execute(() -> {
                System.out.println(
                        "Ataza " + id +
                                " -> " +
                                Thread.currentThread().getName()
                );
            });
        }
        executor.shutdown();
    }
}

