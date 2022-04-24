import { Module } from "vuex";

import { getArticleTop } from '../../service/article/index'

import router from "@/router";
import message from '../../utils/message'

import { IArticleListState } from "./types";
import { IRootState } from "../types";
import { IGetArticleTop } from "../../service/article/type";

const articleByModule:Module<IArticleListState,IRootState>={
  namespaced:true,
  state(){
    return{
      articleTopByViews:[],
      articleTopByComments:[],
      articleTopByStars:[],
    }
  },
  mutations:{
    changeArticleTopByViews(state,articleTopByViews:any){
      state.articleTopByViews=articleTopByViews
    },
    changeArticleTopByComments(state,articleTopByComments:any){
      state.articleTopByComments=articleTopByComments
    },
    changeArticleTopByStars(state,articleTopByStars:any){
      state.articleTopByStars=articleTopByStars
    }
    },
  actions:{
    async getArticleByList({commit},payload:IGetArticleTop) {
      const data=await getArticleTop({
        limit:payload.limit,
        orderBy:payload.orderBy+'.desc'
      })
      if(data.success){
        switch(payload.orderBy){
          case 'articleViews':
            commit('changeArticleTopByViews',data.data)
            break
          case 'articleComments':
            commit('changeArticleTopByComments',data.data)
            break
          case 'articleStar':
            commit('changeArticleTopByStars',data.data)
            break
        }
      }else{
        message.warning(data.data)
      }
    }
  }
}

export default articleByModule