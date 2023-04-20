package ptit.tmdt.bansach.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ptit.tmdt.bansach.repository.AccountRepository;

@Service
public class AccountService {
    @Autowired
    AccountRepository accountRepository;
}
