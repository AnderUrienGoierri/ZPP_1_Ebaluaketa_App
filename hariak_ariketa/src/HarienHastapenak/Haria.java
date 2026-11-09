package HarienHastapenak;

public class Haria extends Thread{

    boolean martxan;

    public Haria(){
        this.martxan=true;
    }

    public void gelditu(){
        this.martxan=false;
    }

    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println("Hari bat naiz eta nire izena " + this.getName());
            try {
                Thread.sleep(500);
            }catch (InterruptedException e){
                throw  new RuntimeException(e);
            }
        }
    }
}
