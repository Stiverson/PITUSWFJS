import linkModel, {ILinkModel} from './linkModel'
import {Link} from './link'

function findByCode(code: string){
   // linkModel = table in database
   return linkModel.findOne<ILinkModel>({where: {code}})
}

function add(link: Link){
   // ILinkModel = linkModel do TS + link do db (unificação de type)
   return linkModel.create<ILinkModel>(link)
}

async function hit(code: string){
   const link = await findByCode(code)
   if(!link) return null
   //  '!' means that I take responsibility for use a property that can return null.
   // Because I know that this will not happen
   link.hits!++
   await link.save()
   return link;
}

export default {
   findByCode,
   add, 
   hit
}