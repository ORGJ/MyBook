/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package ui;

import java.awt.Dimension;
import java.awt.Graphics;
import javax.swing.ImageIcon;

/**
 *
 * @author Joan
 */
public class Carretera extends javax.swing.JPanel {

     private ImageIcon imagen;
    /**
     * Creates new form Carretera
     */
    public Carretera() {
        initComponents();
        imagen = new ImageIcon(getClass().getResource("../img/FondoCalle.jpg"));
        setSize(imagen.getIconWidth(), imagen.getIconHeight());    
    }
    @Override
    protected void paintComponent(Graphics g)
    {
    
        Dimension d = getSize();
        g.drawImage(imagen.getImage(), 0, 0, d.width, d.height, this);
        this.setOpaque(false);
        super.paintComponent(g);
    
    }
    /**
     * This method is called from within the constructor to initialize the form.
     * WARNING: Do NOT modify this code. The content of this method is always
     * regenerated by the Form Editor.
     */
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