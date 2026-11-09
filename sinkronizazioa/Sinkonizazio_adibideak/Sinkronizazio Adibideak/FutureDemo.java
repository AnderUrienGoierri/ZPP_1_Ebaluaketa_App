import java.util.concurrent.*;

public class FutureDemo {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        ExecutorService executor = Executors.newSingleThreadExecutor();
        Callable<Integer> task = () -> {
            Thread.sleep(5000);
            return 100;
        };
        Future<Integer> future = executor.submit(task);
        System.out.println("Zain...");
        Integer result = future.get();
        System.out.println("Emaitza = "+result);
        executor.shutdown();
    }
}
