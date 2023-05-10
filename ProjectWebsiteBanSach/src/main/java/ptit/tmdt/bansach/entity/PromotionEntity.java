/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ptit.tmdt.bansach.entity;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
@Table(name = "promotion")
public class PromotionEntity implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int promotionId;
    private String promotionName;
    @Column(columnDefinition = "text")
    private String promotionDescription;
    private String promotionType;
    private float discount;
    @Column(columnDefinition = "LONGTEXT")
    private String linkImage;
    @Temporal(javax.persistence.TemporalType.TIMESTAMP)
    private Date promotionStartTime;
    @Temporal(javax.persistence.TemporalType.TIMESTAMP)
    private Date promotionEndTime;
}
