package ptit.tmdt.bansach.controller;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ptit.tmdt.bansach.entity.AccountEntity;
import ptit.tmdt.bansach.entity.AuthorDetailEntity;
import ptit.tmdt.bansach.entity.AuthorEntity;
import ptit.tmdt.bansach.entity.CategoryEntity;
import ptit.tmdt.bansach.entity.LanguageEntity;
import ptit.tmdt.bansach.entity.OrderEntity;
import ptit.tmdt.bansach.entity.ProductEntity;
import ptit.tmdt.bansach.entity.PublishingCompanyEntity;
import ptit.tmdt.bansach.entity.UserEntity;
import ptit.tmdt.bansach.repository.AccountRepository;
import ptit.tmdt.bansach.repository.AuthorDetailRepository;
import ptit.tmdt.bansach.repository.AuthorRepository;
import ptit.tmdt.bansach.repository.CategoryRepository;
import ptit.tmdt.bansach.repository.LanguageRepository;
import ptit.tmdt.bansach.repository.OrderDetailRepository;
import ptit.tmdt.bansach.repository.OrderRepository;
import ptit.tmdt.bansach.repository.ProductRepository;
import ptit.tmdt.bansach.repository.PublishingCoRepository;
import ptit.tmdt.bansach.repository.UserRepository;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class AdminController {
    @Autowired
    AccountRepository accountRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    PublishingCoRepository publishingCoRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    LanguageRepository languageRepository;

    @Autowired
    AuthorRepository authorRepository;

    @Autowired
    AuthorDetailRepository authorDetailRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    OrderRepository orderRepository;
    @Autowired
    OrderDetailRepository orderDetailRepository;

    @GetMapping("/showAllProduct")
    public List<ProductEntity> showAllProduct() {
        try {
            List<ProductEntity> list = (List<ProductEntity>) productRepository.findAll();
            // System.out.println(list);
            return list;
        } catch (Exception e) {
            // TODO: handle exception
        }
        return null;
    }

    @PostMapping("/addProduct")
    public String addProduct(@RequestBody ProductFull product) {
        try {
            ProductEntity productEntity = new ProductEntity();
            productEntity.setProductId(product.getId());
            productEntity.setProductName(product.getName());
            productEntity.setLinkImage(product.getLinkImg());
            productEntity.setPrice(product.getPrice());
            productEntity.setProductSize(product.getSize());
            productEntity.setTranslator(product.getTranslator());
            productEntity.setPublicationDate(product.getDateRelease());
            productEntity.setNumbersOfPages(product.getPage());
            productEntity.setProductDescription(product.getDescribe());
            productEntity.setNumberOfProduct(product.getQuantity());

            // xử lý publishing company
            PublishingCompanyEntity pC = publishingCoRepository.findAllByName(product.getNxb());
            if (pC == null) {
                PublishingCompanyEntity pc_save = new PublishingCompanyEntity();
                pc_save.setPublishingCompanyName(product.getNxb());
                publishingCoRepository.save(pc_save);
            }
            productEntity.setPublishingCompany(publishingCoRepository.findAllByName(product.getNxb()));

            // xử lý category
            CategoryEntity cate = categoryRepository.findAllByName(product.getCategory());
            productEntity.setCategory(cate);

            // xử lý language
            LanguageEntity lang = languageRepository.findAllByName(product.getLanguage());
            productEntity.setLanguage(lang);

            productRepository.save(productEntity);

            ProductEntity prdct = productRepository.findByNameLatest(productEntity.getProductName());
            // xử lý author
            String[] lAuthor = product.getAuthors().trim().split(";");
            System.out.println(lAuthor[0]);
            for (String x : lAuthor) {
                // check author
                AuthorEntity aue = authorRepository.findAllByName(x);
                if (aue == null) {
                    AuthorEntity aue1 = new AuthorEntity();
                    aue1.setAuthorName(x);
                    authorRepository.save(aue1);
                    System.out.println("author saved");
                }
                AuthorEntity authorEntity = authorRepository.findAllByName(x);
                AuthorDetailEntity ade = new AuthorDetailEntity();
                ade.setAuthor(authorEntity);
                ade.setProduct(prdct);
                authorDetailRepository.save(ade);
            }

            return "Trong try";
        } catch (Exception e) {
            // TODO: handle exception
            System.out.println(e);
        }
        return "Ngoài try";
    }

    @GetMapping("/getCategory")
    public List<CategoryEntity> getCategory() {
        try {
            List<CategoryEntity> list = (List<CategoryEntity>) categoryRepository.findAll();
            return list;
        } catch (Exception e) {
            // TODO: handle exception
            System.out.println(e);
        }
        return null;
    }

    @GetMapping("/getLanguage")
    public List<LanguageEntity> getLanguage() {
        try {
            List<LanguageEntity> list = (List<LanguageEntity>) languageRepository.findAll();
            return list;
        } catch (Exception e) {
            // TODO: handle exception
            System.out.println(e);
        }
        return null;
    }

    @GetMapping("/showSingleProduct")
    public ProductFull showSingleProduct(@RequestParam Integer id) {
        try {
            // Optional<ProductEntity> productEntity = productRepository.findById(id);
            AuthorDetailEntity ade = authorDetailRepository.findByProductId(id);

            ProductFull pf = new ProductFull();
            pf.setId(id);
            pf.setName(ade.getProduct().getProductName());
            pf.setLinkImg(ade.getProduct().getLinkImage());
            // pf.setAuthors(ade.getAuthor().getAuthorName()); // ??????
            pf.setDateRelease((Date) ade.getProduct().getPublicationDate());
            pf.setDescribe(ade.getProduct().getProductDescription());
            pf.setLanguage(ade.getProduct().getLanguage().getLanguageName());
            pf.setNxb(ade.getProduct().getPublishingCompany().getPublishingCompanyName());
            pf.setPage(ade.getProduct().getNumbersOfPages());
            pf.setPrice(ade.getProduct().getPrice());
            pf.setQuantity(ade.getProduct().getNumberOfProduct());
            pf.setSize(ade.getProduct().getProductSize());
            pf.setTranslator(ade.getProduct().getTranslator());
            pf.setCategory(ade.getProduct().getCategory().getCategoryName());

            // xử lý authors
            List<AuthorEntity> listA = (List<AuthorEntity>) authorRepository.findAuthorsByProductId(id);
            // System.out.println(listA.get(0));
            String authors = "";
            for (AuthorEntity x : listA) {
                authors += x.getAuthorName().toString() + "; ";
            }
            String authors1 = authors.substring(0, authors.length() - 2);
            pf.setAuthors(authors1);

            // // pf.setAuthors("");
            return pf;
        } catch (Exception e) {
            // TODO: handle exception
        }
        return null;
    }

    @GetMapping("/getAuthors")
    public List<AuthorEntity> getAuthors(@RequestParam Integer id) {
        try {
            List<AuthorEntity> listA = (List<AuthorEntity>) authorRepository.findAuthorsByProductId(id);

            return listA;
        } catch (Exception e) {
            // TODO: handle exception
        }
        return null;
    }

    @GetMapping("/deleteProduct")
    public String delProduct(@RequestParam Integer id) {
        try {
            productRepository.deleteById(id);
            return "Xoá thành công";
        } catch (Exception e) {
            // TODO: handle exception
            System.out.println(e);
        }
        return null;
    }

    // ----------------------------QL_KHACH_HANG----------------------------------------------

    @GetMapping("/showAllKH")
    public List<NguoiDung> getAllKH() {
        try {
            List<NguoiDung> listND = new ArrayList<>();
            List<UserEntity> listE = (List<UserEntity>) userRepository.findAll();
            for (UserEntity u : listE) {
                NguoiDung nd = new NguoiDung();
                nd.setId(u.getUserId());
                nd.setName(u.getName());
                nd.setEmail(u.getEmail());
                nd.setPhoneNumber(u.getPhoneNumber());
                nd.setUsername(u.getAccount().getUsername());
                nd.setPassword(u.getAccount().getPassword());
                listND.add(nd);
            }
            return listND;
        } catch (Exception e) {

            System.out.println(e);
        }
        return null;
    }

    @GetMapping("/searchKH")
    public List<NguoiDung> searchKH(@RequestParam String name) {
        try {
            System.out.println(name);
            List<NguoiDung> listND = new ArrayList<>();
            List<UserEntity> listE = (List<UserEntity>) userRepository.findByName("%" + name + "%");

            for (UserEntity u : listE) {
                NguoiDung nd = new NguoiDung();
                nd.setId(u.getUserId());
                nd.setName(u.getName());
                nd.setEmail(u.getEmail());
                nd.setPhoneNumber(u.getPhoneNumber());
                nd.setUsername(u.getAccount().getUsername());
                nd.setPassword(u.getAccount().getPassword());
                listND.add(nd);
            }
            return listND;
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }

    @GetMapping("/deleteKH")
    public String delKH(@RequestParam Integer id) {
        try {
            userRepository.deleteById(id);
            return "Xoá thành công";
        } catch (Exception e) {
            // TODO: handle exception
            System.out.println(e);
        }
        return null;
    }

    @PostMapping("/saveKH")
    public String saveKH(@RequestBody NguoiDung nguoiDung) {
        try {
            if (nguoiDung.getId() == 0) {
                // Check trùng username
                AccountEntity aec = accountRepository.findByUsername(nguoiDung.getUsername());
                if (aec == null) {
                    // Lưu account
                    AccountEntity ae = new AccountEntity();
                    ae.setAccountType("user");
                    ae.setUsername(nguoiDung.getUsername());
                    ae.setPassword(nguoiDung.getPassword());

                    accountRepository.save(ae);
                    // Lưu user
                    UserEntity ue = new UserEntity();
                    ue.setName(nguoiDung.getName());
                    ue.setEmail(nguoiDung.getEmail());
                    ue.setPhoneNumber(nguoiDung.getPhoneNumber());
                    ue.setAccount(ae);

                    userRepository.save(ue);
                    return "Lưu KH thành công";
                } else {
                    return "Trùng username";
                }
            } else {
                // Lưu account
                AccountEntity ae = accountRepository.findByUsername(nguoiDung.getUsername());
                ae.setAccountType("user");
                ae.setUsername(nguoiDung.getUsername());
                ae.setPassword(nguoiDung.getPassword());

                accountRepository.save(ae);
                // Lưu user
                UserEntity ue = userRepository.findByUserId(nguoiDung.getId());
                ue.setName(nguoiDung.getName());
                ue.setEmail(nguoiDung.getEmail());
                ue.setPhoneNumber(nguoiDung.getPhoneNumber());
                ue.setAccount(ae);

                userRepository.save(ue);
                return "Lưu KH thành công";
            }

        } catch (Exception e) {
            // TODO: handle exception
            System.out.println(e);
        }
        return null;
    }

    @GetMapping("/showSingleKH")
    public NguoiDung showSingleKH(@RequestParam int id) {
        try {
            NguoiDung nd = new NguoiDung();
            UserEntity ue = userRepository.findByUserId(id);
            nd.setName(ue.getName());
            nd.setEmail(ue.getEmail());
            nd.setPhoneNumber(ue.getPhoneNumber());
            nd.setUsername(ue.getAccount().getUsername());
            nd.setPassword(ue.getAccount().getPassword());

            return nd;
        } catch (Exception e) {
            // TODO: handle exception
            System.out.println(e);
        }
        return null;
    }

    // ADMIN HOME
    // PAGE----------------------------------------------------------------------------
    @GetMapping("/showSoLuongDonhang")
    public Integer showSoLuongDonhang() {
        try {
            int soluong = orderRepository.countOrder();
            return soluong;
        } catch (Exception e) {
            // TODO: handle exception
            System.out.println(e);
        }
        return null;
    }

    @GetMapping("/showSoLuongKH")
    public Integer showSoLuongKH() {
        try {
            int soluong = userRepository.countKH();
            return soluong;
        } catch (Exception e) {
            // TODO: handle exception
        }
        return null;
    }

    @GetMapping("/showDoanhThu")
    public Float showDoanhThu() {
        try {
            float soluong = 0;
            List<OrderEntity> listO = (List<OrderEntity>) orderRepository.findAll();
            for (OrderEntity x : listO) {
                soluong += x.getOrderTotal();
            }

            return soluong;
        } catch (Exception e) {
            // TODO: handle exception
        }
        return null;
    }

    @GetMapping("/showDonHangMoi")
    public List<OrderHomepage> showDonHangMoi() {
        try {
            List<OrderHomepage> ord = new ArrayList<>();
            List<OrderEntity> oe = (List<OrderEntity>) orderRepository.findTenNewest();
            // List<OrderDetailEntity> ode = (List<OrderDetailEntity>)
            // orderDetailRepository.findAll();

            for (OrderEntity x : oe) {
                OrderHomepage oh = new OrderHomepage();
                oh.setOrderDate(x.getPurchaseDate().toString());
                oh.setOrderTotal(x.getOrderTotal());
                oh.setOrder_status(x.getOrderStatus());

                int soluong = orderDetailRepository.countByOrderId(x.getOrderId());
                oh.setSoluong(soluong);

                String username = x.getUser().getAccount().getUsername();
                oh.setUsername(username);

                ord.add(oh);
            }

            return ord;
        } catch (Exception e) {
            // TODO: handle exception
            System.out.println(e);
        }
        return null;
    }
}

class ProductFull {
    private int id;
    private String name;
    private String linkImg;
    private Float price;
    private String language;
    private String translator;
    private String nxb;
    private int page;
    private String size;
    private Date dateRelease;
    private int quantity;
    private String describe;
    private String authors;
    private String category;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLinkImg() {
        return linkImg;
    }

    public void setLinkImg(String linkImg) {
        this.linkImg = linkImg;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getTranslator() {
        return translator;
    }

    public void setTranslator(String translator) {
        this.translator = translator;
    }

    public String getNxb() {
        return nxb;
    }

    public void setNxb(String nxb) {
        this.nxb = nxb;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public Date getDateRelease() {
        return dateRelease;
    }

    public void setDateRelease(Date dateRelease) {
        this.dateRelease = dateRelease;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getDescribe() {
        return describe;
    }

    public void setDescribe(String describe) {
        this.describe = describe;
    }

    public String getAuthors() {
        return authors;
    }

    public void setAuthors(String authors) {
        this.authors = authors;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getPage() {
        return page;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}

class NguoiDung {
    private int id;
    private String name;
    private String email;
    private String phoneNumber;
    private String username;
    private String password;

    public NguoiDung() {
    }

    public NguoiDung(String name, String email, String phoneNumber, String username, String password) {
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.username = username;
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

}

class OrderHomepage {
    private String username;
    private String orderDate;
    private int soluong;
    private float orderTotal;
    private String order_status;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(String orderDate) {
        this.orderDate = orderDate;
    }

    public int getSoluong() {
        return soluong;
    }

    public void setSoluong(int soluong) {
        this.soluong = soluong;
    }

    public float getOrderTotal() {
        return orderTotal;
    }

    public void setOrderTotal(float orderTotal) {
        this.orderTotal = orderTotal;
    }

    public String getOrder_status() {
        return order_status;
    }

    public void setOrder_status(String order_status) {
        this.order_status = order_status;
    }
}