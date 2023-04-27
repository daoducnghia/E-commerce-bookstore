package ptit.tmdt.bansach.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ptit.tmdt.bansach.entity.ProductEntity;
import ptit.tmdt.bansach.repository.ProductRepository;

@CrossOrigin
@RequestMapping("/api")
@RestController
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    @GetMapping("/search")
    public List<ProductEntity> doSearch(@RequestParam String name) {
        try {
            List<ProductEntity> list = (List<ProductEntity>) productRepository.findByName(name);
            return list;
        } catch (Exception e) {
            // TODO: handle exception
        }
        return null;
    }
}
