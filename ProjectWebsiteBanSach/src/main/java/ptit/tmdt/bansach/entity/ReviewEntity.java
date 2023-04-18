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
@Table(name = "review")
public class ReviewEntity implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reviewId;
    private int point;
    private String description;
    @Temporal(javax.persistence.TemporalType.TIMESTAMP)
    private Date reviewDate;
    
    @ManyToOne
    @JoinColumn(name = "userId")
    private UserEntity user;
    
    @ManyToOne
    @JoinColumn(name = "productId")
    private ProductEntity product;
}
