package br.com.brunopasqualini;

import org.springframework.beans.BeansException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

@SpringBootApplication
public class AulaApplication implements ApplicationContextAware {

    private static ApplicationContext ctx;

    public static <T> T getBean(Class<T> tClass) {
        return ctx.getBean(tClass);
    }

    public static <T> T getBean(String name, Class<T> tClass) {
        return ctx.getBean(name, tClass);
    }

    public static void main(String[] args) {
        ctx = SpringApplication.run(AulaApplication.class, args);
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        ctx = applicationContext;
    }
}
