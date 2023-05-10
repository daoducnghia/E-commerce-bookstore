/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package ptit.tmdt.bansach.repository;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ptit.tmdt.bansach.entity.BankCardEntity;
import ptit.tmdt.bansach.entity.UserEntity;

/**
 *
 * @author dovan
 */
@Repository
public interface BankCardRepository extends CrudRepository<BankCardEntity, Integer>{

    public List<BankCardEntity> findAllByUser(UserEntity user);

    
    
}
