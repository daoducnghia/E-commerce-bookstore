package ptit.tmdt.bansach.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ptit.tmdt.bansach.entity.AccountEntity;

@Repository
public interface AdminRepository extends JpaRepository<AccountEntity, Integer> {

}
