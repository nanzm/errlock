import {Breadcrumb} from './type'

class Ana {
  private config: Record<string, any>
  private globalContext: object
  private Breadcrumb: Breadcrumb[]

  public constructor (options) {
    this.config = options
    this.globalContext = {}
    this.Breadcrumb = []
  }
  

}

export default Ana



