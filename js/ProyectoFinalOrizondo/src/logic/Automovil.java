/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package logic;

import java.awt.*;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.ImageIcon;

/**
 *
 * @author Joan
 */
public  class Automovil extends javax.swing.JPanel implements Runnable{

   private ImageIcon imagen;
   private int autoID;
   private String direccion;
   
   
    public Automovil(int autoID, String direccion) {
        initComponents();
        this.direccion = direccion;
        this.autoID = autoID;
        
        imagen = new ImageIcon(getClass().getResource("../img/Vehiculo.jpg"));
        setSize(imagen.getIconWidth(), imagen.getIconHeight());    
    }
    
 
    
   
    @Override
    public void run() {
        while(true)
        {
            try {
                Thread.sleep(10);
            } catch (InterruptedException ex) {
                Logger.getLogger(Automovil.class.getName()).log(Level.SEVERE, null, ex);
            }
            switch(direccion)
            {
                case "Izquierda": 
                    
                      this.setLocation(this.getX()-1, this.getY()); 
                       if(this.getX()==29){
                     this.setLocation(727, 345); 
                    }
                    break;
                case "Derecha": 
                    this.setLocation(this.getX()+1, this.getY()); 
                    if(this.getX()==727){
                     this.setLocation(29, 170); 
                    }
                    break;
                case "Abajo": 
                     this.setLocation(this.getX(), this.getY()+1); 
                      if(this.getY()==503){
                     this.setLocation(260, 12); 
                    }
                    break;
                case "Arriba":
                    this.setLocation(this.getX(), this.getY()-1); 
                    if(this.getY()==12){
                     this.setLocation(501, 503); 
                    }
                    break;
            }
          
        }

    }
    
    public int getAutoID() {
        return autoID;
    }

    public void setAutoID(int autoID) {
        this.autoID = autoID;
    }
    
    @Override
    protected void paintComponent(Graphics g)
    {
        Dimension d = getSize();
        g.drawImage(imagen.getImage(), 0, 0, d.width, d.height, this);
        this.setOpaque(false);
        super.paintComponent(g);
    
    }
    
    
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(this);
        this.setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 400, Short.MAX_VALUE)
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 300, Short.MAX_VALUE)
        );
    }// </editor-fold>//GEN-END:initComponents
    // Variables declaration - do not modify//GEN-BEGIN:variables
    // End of variables declaration//GEN-END:variables
}
