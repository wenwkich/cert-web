import Link from 'next/link'

const Certificate = (props) => (
  <div>
    <div>
      <h2 className="text-center">{props.data.badge.name}</h2>
      <p className="text-center">Issued on {props.data.issuedOn.substring(0, 10)}</p>
      <hr />
      <p className="font-size-larger text-center">This is to certify that <strong>{props.data.recipientProfile.name}</strong> schoolmate
      started his/her intership at <strong>{props.data.badge.issuer.name}</strong> from
      <strong> {props.data.badge.fromDate}</strong> to
      <strong> {props.data.badge.toDate}</strong> and did
      <strong> {props.data.badge.description}</strong> related work</p>
      <p />
      <div className="text-center">
        <img src="/certificate.png" />    
      </div>
      <hr />
      <p><strong>ID of certificate: </strong>{props.data.id.substring(9)}</p>
      <hr/>
      <h3>Issuer Profile</h3>
      <p />
      <p><strong>Name: </strong>{props.data.badge.issuer.name}</p>
      <p><strong>URL: </strong><Link href={props.data.badge.issuer.url}><a>{props.data.badge.issuer.url}</a></Link></p>
      <p><strong>Email: </strong>{props.data.badge.issuer.email}</p>
      <hr />
      <h3>Recipient Profile</h3>
      <p />
      <p><strong>Name: </strong>{props.data.recipientProfile.name}</p>
      <p><strong>Email: </strong>{props.data.recipient.identity}</p>
      <hr />
      <h3>Blockchain Infomation</h3>
      <p />
      <p>The hash of this certificate is stored on this <Link
        href={`https://testnet.blockexplorer.com/tx/${props.data.signature.anchors[0].sourceId}`}>
        <a>link</a></Link></p>
      <p><strong>Transaction ID: </strong>{props.data.signature.anchors[0].sourceId}</p>
      <p><strong>Hash of this certificate: </strong>{props.data.signature.targetHash}</p>
      <hr />
      <h3>Download</h3>
      <p />
      <p>Please bookmark this page for your future reference! </p>
      <p>You can download this certificate via this <Link
        href={`http://localhost/api/cert/${props.data.id.substring(9)}.json`}>
        <a>link</a></Link></p>
      <p><strong>Important: </strong>Also, you can use this link for verification (just right click the link and press "Copy Link Address")!</p>
    </div>
    <style jsx>{`
      .font-size-larger {
        font-size: 24px
      }

      .img-center {

      }
    `}</style>
  </div>
)


export default Certificate;