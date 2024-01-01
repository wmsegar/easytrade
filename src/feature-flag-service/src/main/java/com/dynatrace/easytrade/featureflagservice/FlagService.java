package com.dynatrace.easytrade.featureflagservice;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.NoArgsConstructor;

@NoArgsConstructor
@Service
public class FlagService {
    private Map<String, Flag> flagRegistry;

    @Autowired
    public FlagService(Map<String, Flag> flags) {
        this.flagRegistry = flags;
    }

    public Optional<Flag> getFlagById(String flagId) {
        return Optional.ofNullable(flagRegistry.get(flagId));
    }

    public Optional<Flag> updateFlag(String flagId, Boolean enabled) {
        Optional<Flag> flag = Optional.ofNullable(flagRegistry.get(flagId));
        flag.ifPresent(f -> f.setEnabled(enabled));
        return flag;
    }

    public List<Flag> getFlagsByTag(String tag) {
        return flagRegistry.values().stream().filter(flag -> tag.equals(flag.getTag())).toList();
    }

    public List<Flag> getAllFlags() {
        return flagRegistry.values().stream().toList();
    }

}
