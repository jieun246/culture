package com.ije.service;

import java.util.List;

import com.ije.domain.Criteria;
import com.ije.domain.MessagePageDTO;
import com.ije.domain.MessageVO;

public interface MessageService {
	
	public int register(MessageVO ins);
	public MessageVO get(Long mno, String userid); 
	public MessagePageDTO getList(Criteria cri); 
	public int modify(MessageVO upt); 
	public int remove(Long mno);
	public List<MessageVO> getListByTarget(String target);
}
