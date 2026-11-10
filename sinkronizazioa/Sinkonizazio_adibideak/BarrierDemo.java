import java.util.concurrent.*;

public class BarrierDemo {

    public static void main(String[] args) {

        CyclicBarrier barrier = new CyclicBarrier(3,()-> System.out.println("Hari guztiak iritsi dira"));

        for(int i=1;i<=3;i++){

            int id=i;

            new Thread(() -> {
                try {
                    System.out.println(id + " prest");

                    barrier.await();

                    System.out.println(id + " hasi");

                } catch(Exception e){
                    e.printStackTrace();
                }

            }).start();
        }
    }
}

