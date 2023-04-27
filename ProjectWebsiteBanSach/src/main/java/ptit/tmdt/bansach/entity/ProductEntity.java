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
@Table(name = "product")
public class ProductEntity implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int productId;
    private String productName;
    private int numbersOfPages;
    @Temporal(javax.persistence.TemporalType.DATE)
    private Date publicationDate;
    @Column(columnDefinition = "text")
    private String productDescription;
    private String linkImage;
    private String productSize;
    private String translator;
    private int numberOfProduct;
    private int numberOfProductSold;
    private float price;
    
    @ManyToOne
    @JoinColumn(name = "categoryId")
    private CategoryEntity category;
    
    @ManyToOne
    @JoinColumn(name = "languageId")
    private LanguageEntity language;
    
    @ManyToOne
    @JoinColumn(name = "publishingCompanyId")
    private PublishingCompanyEntity publishingCompany;
}
