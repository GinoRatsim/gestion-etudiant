package ge.utils;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseHandler {

	public ResponseEntity<Object> generateResponse(HttpStatus status, Object responseObj) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			map.put("status", status);
			map.put("result", responseObj);
			return new ResponseEntity<Object>(map, status);
		} catch (Exception e) {
			map.clear();
			map.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
			map.put("result", null);
			return new ResponseEntity<Object>(map, status);
		}
	}
	
}