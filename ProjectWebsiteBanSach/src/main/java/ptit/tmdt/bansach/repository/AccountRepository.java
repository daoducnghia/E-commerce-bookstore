package ptit.tmdt.bansach.repository;

import org.springframework.stereotype.Repository;

import ptit.tmdt.bansach.entity.AccountEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface AccountRepository extends JpaRepository<AccountEntity, Integer> {
    @Query(value = "select * from database_bansach_pthttmdt_btl.account where username like ?", nativeQuery = true)
    public AccountEntity findByUsername(String username);

}
