package com.optimusprime.dto.deserializer;

import java.io.IOException;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.ObjectCodec;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.optimusprime.model.UserActiveEnum;

public class UserActiveDeserializer extends JsonDeserializer<UserActiveEnum> {

	@Override
	public UserActiveEnum deserialize(JsonParser jsonParser, DeserializationContext ctxt)
			throws IOException, JacksonException {
		final ObjectCodec objectCodec = jsonParser.getCodec();
		final JsonNode node = objectCodec.readTree(jsonParser);
		final String type = node.asText();
		return UserActiveEnum.valueOf(type.toUpperCase());
	}

}
