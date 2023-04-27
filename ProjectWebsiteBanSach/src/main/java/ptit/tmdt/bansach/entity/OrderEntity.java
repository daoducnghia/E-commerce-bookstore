/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ptit.tmdt.bansach.entity;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author dovan
 */
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "tblOrder")
public class OrderEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderId;
    @Temporal(javax.persistence.TemporalType.TIMESTAMP)
    private Date purchaseDate;
    private float orderTotal;
    private float transportFee;
    private float discount;
    private String paymentMethod;
    private String orderStatus;
    
    @ManyToOne
    @JoinColumn(name = "userId")
    private UserEntity user;
}
