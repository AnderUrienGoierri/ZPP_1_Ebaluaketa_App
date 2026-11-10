import java.util.concurrent.*;

public class ConcurrentMapDemo {

    public static void main(String[] args)
            throws Exception {

        ConcurrentHashMap<Integer,String>
                map = new ConcurrentHashMap<>();

        ExecutorService executor =
                Executors.newFixedThreadPool(4);

        for(int i=1;i<=10;i++){

            int id=i;
            executor.submit(() ->
                    map.put(id,"Balioa-"+id)
            );
        }

        executor.shutdown();
        //Thread.sleep(0,10);
        executor.awaitTermination(5,TimeUnit.SECONDS);

        System.out.println(map);
    }
}

