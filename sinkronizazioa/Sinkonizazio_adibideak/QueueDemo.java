import java.util.concurrent.*;

public class QueueDemo {
    public static void main(String[] args) {
        BlockingQueue<String> queue = new ArrayBlockingQueue<>(5);
        new Thread(() -> {
            try {
                for (int i = 1; i <= 5; i++) {
                    queue.put("Produktua-" + i);
                    System.out.println("Sortua: " + i );
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }).start();
        new Thread(() -> {
            try {
                for (int i = 1; i <= 5; i++) {
                    String item = queue.take();
                    System.out.println("Kontsumitua: " + item);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }).start();
    }
}
