import {eleventyImageTransformPlugin} from "@11ty/eleventy-img"
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight"
import {EleventyHtmlBasePlugin, EleventyI18nPlugin} from "@11ty/eleventy";
import {feedPlugin} from "@11ty/eleventy-plugin-rss";
import yaml from "js-yaml"

export default function (eleventyConfig) {

    eleventyConfig.addFilter("toLocaleStringFr", function (date) {
        return new Date(date).toLocaleString("fr-FR",
            {weekday: "long", month: "long", day: "numeric", year: "numeric"})
    });

    eleventyConfig.addFilter("toLocaleStringFrShort", function (date) {
        return new Date(date).toLocaleString("fr-FR",
            {month: "2-digit", day: "numeric", year: "numeric"})
    });

    eleventyConfig.addFilter("toIsoString", function (date) {
        return new Date(date).toISOString()
    });


    eleventyConfig.addCollection("latestFewFinishedArticles", function (collectionApi) {
        let all = collectionApi.getFilteredByTag("blog");
        return all
            .filter(item => !item.data.stub)
            .filter(item => !item.data.draft)
            .sort((a, b) => b.date - a.date)
            .slice(0, 5);

    });

    eleventyConfig.addCollection("allFinishedArticles", function (collectionApi) {
        let all = collectionApi.getFilteredByTag("blog");
        return all
            .filter(item => !item.data.stub)
            .filter(item => !item.data.draft)
            .sort((a, b) => b.date - a.date);

    });


    // Copy static styles as is
    eleventyConfig.addPassthroughCopy("public/css");

    // Required to support --pathprefix
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

    // Internationalization
    eleventyConfig.addPlugin(EleventyI18nPlugin, {
        defaultLanguage: "fr",
    });

    // RSS feed
    eleventyConfig.addPlugin(feedPlugin, {
        type: "rss",
        outputPath: "/feed.xml",
        collection: {
            name: "blog"
        }
    })

    // Code snippets with syntax highlighting
    eleventyConfig.addPlugin(syntaxHighlight, {
        lineSeparator: "\n",
        errorOnInvalidLanguage: true,
        alwaysWrapLineHighlights: true,
        preAttributes: {},
        codeAttributes: {}
    });

    // Create images variants of different dimensions and different formats.
    // They will be loaded depending on the viewport
    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
        outputDir: "./_site/public/img/",
        urlPath: "/public/img/",

        extensions: "html",

        // output image formats
        formats: ["webp", "jpeg", "png","auto"],

        // output image widths
        widths: ["320", "640", "800", "1024", "auto"],

        // attributes assigned on <img> override these values.
        defaultAttributes: {
            loading: "lazy",
            decoding: "async",
            sizes: `100vw`,
        },

        sharpOptions:{
            animated: true,
        }
    })

    // Support yaml data files : https://www.11ty.dev/docs/data-custom/#yaml
    eleventyConfig.addDataExtension("yml", (contents) => yaml.load(contents));


}

