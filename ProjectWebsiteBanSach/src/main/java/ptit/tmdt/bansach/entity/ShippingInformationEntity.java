/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ptit.tmdt.bansach.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
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
@Table(name = "ShippingInfomation")
public class ShippingInformationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int shippingInfomationId;
    
    @ManyToOne
    @JoinColumn(name = "orderId")
    private OrderEntity order;
    
    @ManyToOne
    @JoinColumn(name = "shipmentDetailId")
    private ShipmentDetailEntity shipmentDetail;
}
