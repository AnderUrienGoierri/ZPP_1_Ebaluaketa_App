import java.util.concurrent.*;

public class LatchDemo {

    public static void main(String[] args)
            throws Exception {

        CountDownLatch latch =  new CountDownLatch(2);

        for(int i=1;i<=5;i++){
            int id=i;
            new Thread(() -> {

                System.out.println("Amaitzen " + id );
                latch.countDown();
            }).start();
        }

        latch.await();
        System.out.println("Lan guztiak amaituta" );
    }
}

