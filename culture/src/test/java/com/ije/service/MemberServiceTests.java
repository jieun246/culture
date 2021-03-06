package com.ije.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.ije.domain.Criteria;
import com.ije.domain.MemberVO;
import com.ije.domain.UnjoinVO;

import lombok.extern.log4j.Log4j;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"file:src\\main\\webapp\\WEB-INF\\spring\\root-context.xml","file:src\\main\\webapp\\WEB-INF\\spring\\security-context.xml"})
@Log4j
public class MemberServiceTests {
	
	@Autowired
	private MemberService service; 
	@Test
	public void register() {
		log.info("등록하기 테스트...............................");
		MemberVO vo = new MemberVO(); 
		vo.setId("test3");
		vo.setPw("test3");
		vo.setName("테스트3");
		vo.setPhone("01012341234");
		vo.setEmail("aa2@gmail.com");
		vo.setFavorites("");
		log.info(vo);
		service.register(vo);
	}
	
	@Test
	public void unjoin() {
		log.info("....................................");
		UnjoinVO ins = new UnjoinVO(); 
		ins.setReason(2L);
		ins.setMemo("");
		ins.setId("test4");
		log.info(ins);
		//service.registerUnjoin(ins);
	}
	
	@Test
	public void getList() {
		log.info("..........................................");
		Criteria cri = new Criteria(); 
		service.getList(cri).forEach(member -> log.info(member));
	}
}
