/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package ptit.tmdt.bansach.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ptit.tmdt.bansach.entity.AccountEntity;

/**
 *
 * @author dovan
 */
@Repository
public interface AccountRepository extends CrudRepository<AccountEntity, Integer>{
    public AccountEntity findByUsername(String username);
}
