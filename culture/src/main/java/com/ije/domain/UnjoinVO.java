package com.ije.domain;

import java.util.Date;

import lombok.Data;

@Data
public class UnjoinVO {
	private Long reason;
	private String memo; 
	private Date rdate;
	private String id; 
}
