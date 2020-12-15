﻿$(document).ready(function () {
    BlogListView.GetRecentBlogs();
});
BlogListView = {
    blogs: null,

    GetRecentBlogs: function () {
        var data = { num_to_get: 10 }
        var params = JSON.stringify(data);
        $.ajax({
            type: "POST",
            url: "/EndpointMaster.aspx/Get_Recent_Blog_Posts",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: params,
            cache: false,
            success: function (data) {
                console.log(data.d);
                var dataJson = JSON.parse(data.d);
                BlogListView.blogs = dataJson.POSTS;
                BlogListView.SetListViewHTML();
            },
            error: function () {
                console.log("Ajax call failed");
            }
        });
    },
    SetListViewHTML: function () {
        var template = $("#blog_posts_template").html();
        var html = BlogListView.blogs.reduce(function (accumulator, currVal) {
            return accumulator + Util.templateHelper(template, {
                blog_id: currVal.BLOG_ID,
                image_url: currVal.IMAGE_URL,
                blog_url: currVal.BLOG_URL,
                date: currVal.DATE,
                title: currVal.TITLE,
                blog_text: currVal.BLOG_TEXT
            });
        }, "");

        $("#blog_list_view_container").html(html);
    }
};