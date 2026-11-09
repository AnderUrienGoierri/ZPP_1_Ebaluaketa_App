import java.util.concurrent.Semaphore;
public class SemaphoreDemo {
    static Semaphore sem = new Semaphore(2);
    public static void main(String[] args) {
        for(int i=1;i<=5;i++){
            int id=i;
            new Thread(() -> {
                try {
                    sem.acquire();
                    System.out.println("Sartu -> " + id );
                    Thread.sleep(2000);
                    System.out.println("Irten -> " + id );
                    sem.release();
                } catch(Exception e){
                    e.printStackTrace();
                }
            }).start();
        }
    }
}

