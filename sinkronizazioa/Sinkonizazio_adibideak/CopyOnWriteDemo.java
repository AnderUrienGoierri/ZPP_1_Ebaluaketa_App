import java.util.concurrent.*;

public class CopyOnWriteDemo {

    public static void main(String[] args) {

        CopyOnWriteArrayList<String>
                list =
                new CopyOnWriteArrayList<>();

        list.add("A");
        list.add("B");
        for(String s : list){

            System.out.println(s);

            list.add("X");
        }

        System.out.println(list);
    }
}

