<<<<<<< HEAD
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
=======
package ptit.tmdt.bansach.repository;

import org.springframework.stereotype.Repository;

import ptit.tmdt.bansach.entity.AccountEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface AccountRepository extends JpaRepository<AccountEntity, Integer> {
    @Query(value = "select * from database_bansach_pthttmdt_btl.account where username like ?", nativeQuery = true)
    public AccountEntity findByUsername(String username);

    @Query(value = "insert into database_bansach_pthttmdt_btl.account (account.username,account.password) values (?1,?2)", nativeQuery = true)
    public AccountEntity saveNguoiDung(String username, String password);

>>>>>>> 35e307b3b6c5c5eccc9357eccec01134f55c8ffc
}
